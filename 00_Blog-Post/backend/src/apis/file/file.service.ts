import { Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}

  fileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return file.path;
  }

  async gcpUpload(file: Express.Multer.File) {
    const waitedFiles = file;

    const bucket = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: 'gcp-file-storage.secret.json',
    }).bucket('2023-nestjs-storage');

    const blob = bucket.file(waitedFiles.originalname);
    const result = new Promise<string>((resolve, reject) => {
      const stream = blob
        .createWriteStream() //읽은 후 스토리지에 저장
        .on('finish', () => {
          console.log('fin');
          resolve(`폴더명/${waitedFiles.originalname}`);
        })
        .on('error', () => {
          reject('catch');
        });
      stream.end(waitedFiles.buffer);
    });

    //const res = Promise.resolve(result);
    const res = await result;
    //https://storage.googleapis.com/2023-nestjs-storage/facebook.png
    return res;
  }
}
