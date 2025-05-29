import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["did"])
export class DeviceDid {
  @PrimaryGeneratedColumn() // @ts-ignore
  id: number;

  @Column() // @ts-ignore
  did: string;

  @Column() // @ts-ignore
  public: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }) // @ts-ignore
  createdAt: Date;
}
