import {
  Injectable,
  InternalServerErrorException,
  UnsupportedMediaTypeException,
} from "@nestjs/common";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs";

@Injectable()
export class FilesService {
  async saveFile(file: any): Promise<string> {
    try {
      const allowedExtensions = [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
        "svg",
        "ico",
        "bmp",
        "tiff",
      ];

      const extension = file.originalname.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        throw new UnsupportedMediaTypeException(
          `Ruxsat etilmagan fayl turi: .${extension}. Faqat ${allowedExtensions.join(", ")} fayllar yuklash mumkin.`
        );
      }
      const fileName = uuid.v4() + `.${extension}`;

      const uploadPath = path.resolve(__dirname, "..", "..", "static");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadPath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      console.error("Xatolik faylni saqlashda:", error);
      throw new InternalServerErrorException(
        "Faylni saqlashda xatolik yuz berdi!"
      );
    }
  }
}
