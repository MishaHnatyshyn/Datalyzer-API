import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from '../models.service';
import {ModelsRepositoryService} from '../models-repository.service';
import { ModelItemsRepositoryService } from '../model-items-repository.service';
import { ModelItemsFieldRepositoryService } from '../model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from '../model-items-relation-repository.service';
import { RelationItem } from '../dto/relationItem.dto';
import { EntityManager } from 'typeorm';

describe('ModelsService', () => {
  let service: ModelsService;
  let mockModelsRepositoryService;
  let mockModelItemsRepositoryService;
  let mockModelItemsFieldsRepositoryService;
  let mockModelItemsRelationsRepositoryService;
  let page;
  let itemsPerPage;
  let search;
  let admin;
  const manager = {};
  const mockModelItemsMap = new Map([
    ['tableName1', 1],
    ['tableName2', 2],
    ['tableName3', 3],
    ['tableName4', 4],
  ]);
  const mockRelationItems: RelationItem[] = [
    { firstTableName: 'tableName1', secondTableName: 'tableName2', firstTableColumn: '', secondTableColumn: '' },
    { firstTableName: 'tableName3', secondTableName: 'tableName4', firstTableColumn: '', secondTableColumn: '' },
  ];
  const originalPatchRelationsDataWithModelsId = ModelsService.patchRelationsDataWithModelsId;
  const originalCreateModelItemsMapForRelations = ModelsService.createModelItemsMapForRelations;

  beforeEach(async () => {
    ModelsService.patchRelationsDataWithModelsId = originalPatchRelationsDataWithModelsId;
    ModelsService.createModelItemsMapForRelations = originalCreateModelItemsMapForRelations;
    page = 1;
    itemsPerPage = 10;
    search = 'search';
    admin = 1;
    mockModelsRepositoryService = {
      getPaginatedModelList: jest.fn(),
      getCount: jest.fn(),
      createModel: jest.fn(),
      delete: jest.fn(),
    };
    mockModelItemsRepositoryService = {
      createModelItem: jest.fn(),
    };
    mockModelItemsFieldsRepositoryService = {
      createModelItemFields: jest.fn(),
    };
    mockModelItemsRelationsRepositoryService = {
      createRelation: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ModelsRepositoryService, useValue: mockModelsRepositoryService },
        { provide: ModelItemsRepositoryService, useValue: mockModelItemsRepositoryService },
        { provide: ModelItemsFieldRepositoryService, useValue: mockModelItemsFieldsRepositoryService },
        { provide: ModelItemsRelationRepositoryService, useValue: mockModelItemsRelationsRepositoryService },
        ModelsService,
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getModelsList', () => {
    it('should return paginated users list', async () => {
      const dummyResponse = [{}];
      mockModelsRepositoryService.getPaginatedModelList = jest.fn().mockReturnValue(dummyResponse);
      const result = await service.getModelsList(page, itemsPerPage, search, admin);
      expect(result).toBe(dummyResponse);
      expect(mockModelsRepositoryService.getPaginatedModelList).toBeCalledTimes(1);
      expect(mockModelsRepositoryService.getPaginatedModelList).toBeCalledWith(0, itemsPerPage, search, admin);
    });

    it('should calculate skip value properly', async () => {
      page = 3;
      itemsPerPage = 10;
      const expectedSkip = 20;
      await service.getModelsList(page, itemsPerPage, search, admin);
      expect(mockModelsRepositoryService.getPaginatedModelList).toBeCalledTimes(1);
      expect(mockModelsRepositoryService.getPaginatedModelList).toBeCalledWith(expectedSkip, itemsPerPage, search, admin);
    });
  });

  describe('getModelsCount', () => {
    it('should return proper count of models', async () => {
      mockModelsRepositoryService.getCount = jest.fn().mockReturnValue(5);
      const result = await service.getModelsCount(admin);
      expect(mockModelsRepositoryService.getCount).toBeCalledTimes(1);
      expect(mockModelsRepositoryService.getCount).toBeCalledWith({ admin_id: admin });
      expect(result).toStrictEqual({ count: 5 });
    });
  });

  describe('createModelInSingleTransaction', () => {
    const mockModel = {
      id: 1,
      created_at: '',
      name: 'name',
    };
    const mockModelItems = [
      { id: 1, tableName: '', name: '', rows: [] },
      { id: 2, tableName: '', name: '', rows: [] },
    ];
    const data = {
      name: 'name',
      connectionId: 1,
      items: mockModelItems,
      relations: [],
    };
    const { name, connectionId, items, relations } = data;
    it('should create model in single sql transaction', async () => {
      mockModelsRepositoryService.createModel = jest.fn().mockReturnValue(Promise.resolve(mockModel));
      service.createModelItem = jest.fn()
        .mockReturnValueOnce(mockModelItems[0])
        .mockReturnValue(mockModelItems[1]);
      ModelsService.createModelItemsMapForRelations = jest.fn().mockReturnValue(mockModelItemsMap);
      ModelsService.patchRelationsDataWithModelsId = jest.fn().mockReturnValue(mockRelationItems);
      mockModelItemsRelationsRepositoryService.createRelation = jest.fn().mockReturnValue({});
      const expectedResult = {
        id: mockModel.id,
        name: mockModel.name,
        tables: mockModelItems.length,
        fields: items.reduce((acc, curr) => acc + curr.rows.length, 0),
        users: 0,
        uses: 0,
        active: true,
        created: mockModel.created_at,
      };

      const result = await service.createModelInSingleTransaction(data, admin, manager);
      expect(mockModelsRepositoryService.createModel).toBeCalledWith(name, admin, connectionId, manager);

      expect(ModelsService.createModelItemsMapForRelations).toBeCalledWith(mockModelItems);
      expect(ModelsService.patchRelationsDataWithModelsId).toBeCalledWith(mockModelItemsMap, relations);

      expect(mockModelItemsRelationsRepositoryService.createRelation)
        .toBeCalledWith({ ...mockRelationItems[0], connectionManager: manager });

      expect(mockModelItemsRelationsRepositoryService.createRelation)
        .toBeCalledWith({ ...mockRelationItems[1], connectionManager: manager });

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('patchRelationsDataWithModelsId', () => {
    it('should format data properly', () => {
      const expectedData = [
        { firstModelItemId: 1, secondModelItemId: 2, firstModelItemField: '', secondModelItemField: '' },
        { firstModelItemId: 3, secondModelItemId: 4, firstModelItemField: '', secondModelItemField: '' },
      ];
      expect(ModelsService.patchRelationsDataWithModelsId(mockModelItemsMap, mockRelationItems)).toStrictEqual(expectedData);
    });
  });

  describe('createModelItemsMapForRelations', () => {
    const modelItems = [
      { table_name: 'tableName1', id: 1 },
      { table_name: 'tableName2', id: 2 },
    ];
    const expectedResult = new Map([
      ['tableName1', 1],
      ['tableName2', 2],
    ]);
    expect(ModelsService.createModelItemsMapForRelations(modelItems)).toStrictEqual(expectedResult);
  });

  describe('createModelItem', () => {
    it('should create model item', async () => {
      const mockModelItemData = {
        tableName: 'name',
        name: 'name',
        rows: [],
      };
      const { tableName, name, rows } = mockModelItemData;
      const modelId = 1;
      const mockModelItem = { id: 1 };
      const modelItemsFields = [];
      mockModelItemsRepositoryService.createModelItem = jest.fn().mockReturnValue(mockModelItem);
      mockModelItemsFieldsRepositoryService.createModelItemFields = jest.fn().mockReturnValue(modelItemsFields);
      const result = await service.createModelItem(mockModelItemData, modelId, manager as EntityManager);
      expect(mockModelItemsRepositoryService.createModelItem).toBeCalledWith(name, tableName, modelId, manager);
      expect(mockModelItemsFieldsRepositoryService.createModelItemFields).toBeCalledWith(rows, mockModelItem.id, manager);
      expect(result).toStrictEqual(mockModelItem);
    });
  });

  describe('deleteModel', () => {
    it('should delete model', async () => {
      const id = 1;
      const expectedResult = {};
      mockModelsRepositoryService.delete = jest.fn().mockReturnValue(expectedResult);
      const result = await service.deleteModel(id);
      expect(mockModelsRepositoryService.delete).toBeCalledWith({ id });
      expect(result).toBe(expectedResult);
    });
  });
});
