import { BigQuery } from '@google-cloud/bigquery';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Product } from './product.entity';

//Product Table의 변경을 감지
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this); //감지 대상에 추가
  }
  listenTo() {
    return Product;
  }

  //Insert 이후 실행
  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event.entity);
    // event.entity.id
    // event.entity.name

    const bigQuery = new BigQuery({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: 'gcp-bigquery.secret.json',
    });

    bigQuery
      .dataset('230215_test')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldOut,
        },
      ]);
  }

  //   beforeInsert(event: InsertEvent<Product>): void | Promise<any> {

  //   }
  //   afterUpdate(event: UpdateEvent<Product>): void | Promise<any> {

  //   }
}
