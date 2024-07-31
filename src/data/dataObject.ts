import { IsString, IsArray, Matches, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";


export class ReceiptRecord {
  @Expose()
  @IsString()
  shortDescription!: string;

  @Expose()
  price!: number;
  
}

export class ReceiptDataObject {
  @Expose()
  @IsString()
  retailer!: string;

  @Expose()
  @Matches(/^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Date must be in yyyy-mm-dd format",
  })
  purchaseDate!: string;

  @Expose()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
    message: "Time must be in HH-MM format",
  })
  purchaseTime!: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiptRecord)
  items!: ReceiptRecord[];

  @Expose()
  total!: number;
}
