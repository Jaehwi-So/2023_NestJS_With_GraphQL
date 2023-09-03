import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @UseGuards(AuthGuard('access'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/single')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.fileService.fileUpload(file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/array')
  uploadFiles(@UploadedFile() file: Express.Multer.File) {
    const result = this.fileService.gcpUpload(file);
    return result;
  }

  /*
  @Post('upload/multi')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'thumbnail',
        maxCount: 1,
      },
      {
        name: 'background',
        maxCount: 1,
      },
    ]),
  )
  uploadMultiFiles(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File;
      background?: Express.Multer.File;
    },
  ) {
    console.log(files);
  }
  */
}
