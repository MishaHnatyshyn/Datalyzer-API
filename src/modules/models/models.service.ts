import { Injectable } from '@nestjs/common';
import { ModelsRepositoryService } from './models-repository.service';
import { ModelItemsRepositoryService } from './model-items-repository.service';
import { ModelItemsFieldRepositoryService } from './model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from './model-items-relation-repository.service';
import { EntityManager, getManager } from 'typeorm';
import { CreateModelDto } from './dto/createModel.dto';
import { ModelItem } from './dto/modelItem.dto';
import { RenameModelDto } from './dto/renameModel.dto';
import {
  createModelItemsMapForRelations,
  formModelDataForReportResponse,
  patchRelationsDataWithModelsId,
} from './utils';

@Injectable()
export class ModelsService {
  constructor(
    private modelsRepositoryService: ModelsRepositoryService,
    private modelItemsRepositoryService: ModelItemsRepositoryService,
    private modelItemsFieldRepositoryService: ModelItemsFieldRepositoryService,
    private modelItemsRelationRepositoryService: ModelItemsRelationRepositoryService,
  ) {}

  getModelsList(page, itemsPerPage, search, admin) {
    const skip = (page - 1) * itemsPerPage;
    return this.modelsRepositoryService.getPaginatedModelList(skip, itemsPerPage, search, admin);
  }

  async getModelsDataForReport(admin: number) {
    const data = await this.modelsRepositoryService.getModelsListForReport(admin);
    return formModelDataForReportResponse(data);
  }

  async getModelsCount(admin: number) {
    const count = await this.modelsRepositoryService.getCount({ admin_id: admin });
    return { count };
  }

  async createModelInSingleTransaction(data: CreateModelDto, admin: number, manager) {
    const { name, connectionId, items, relations } = data;
    const model = await this.modelsRepositoryService.createModel(name, admin, connectionId, manager);
    const { id: modelId } = model;
    const modelItems = await Promise.all(items.map(item => this.createModelItem(item, modelId, manager)));
    const modelItemsMap = createModelItemsMapForRelations(modelItems);
    const relationsWithModelsId = patchRelationsDataWithModelsId(modelItemsMap, relations);
    await Promise.all(
      relationsWithModelsId.map(relation =>
        this.modelItemsRelationRepositoryService.createRelation({ ...relation, connectionManager: manager }),
      ),
    );
    return {
      id: modelId,
      name: model.name,
      tables: modelItems.length,
      fields: items.reduce((acc, curr) => acc + curr.rows.length, 0),
      users: 0,
      uses: 0,
      active: true,
      created: model.created_at,
    };
  }

  async createModel(data: CreateModelDto, admin: number) {
    return await getManager().transaction(async manager => {
      return this.createModelInSingleTransaction(data, admin, manager);
    });
  }

  async createModelItem(modelItemData: ModelItem, modelId: number, connectionManager: EntityManager) {
    const { tableName, name, rows } = modelItemData;
    const modelItem = await this.modelItemsRepositoryService.createModelItem(
      name,
      tableName,
      modelId,
      connectionManager,
    );
    const { id: modelItemId } = modelItem;
    await this.modelItemsFieldRepositoryService.createModelItemFields(rows, modelItemId, connectionManager);
    return modelItem;
  }

  async deleteModel(id: number) {
    return this.modelsRepositoryService.delete({ id });
  }
  async renameModel(data: RenameModelDto, id: number) {
    await this.modelsRepositoryService.update(id, data);
    return this.modelsRepositoryService.modelInfo(id);
  }
  getRelationData(firstId, secondId) {
    return this.modelItemsRelationRepositoryService.getRelationByModelItems(firstId, secondId);
  }

  getModelItemsFieldsData(ids: number[]) {
    return this.modelItemsFieldRepositoryService.getModelItemsFieldsData(ids);
  }

  async getConnectionIdByModelItemFieldId(id) {
    const data = await this.modelItemsFieldRepositoryService.getConnectionIdByModelItemFieldId(id);
    return data.id;
  }
}
