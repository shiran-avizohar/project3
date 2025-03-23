import { 
    AllowNull, 
    BelongsTo, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table 
} from "sequelize-typescript";
import Vacation from "./vacation";
import User from "./user";

@Table({
    underscored: true,
})
export default class Follow extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    followId: string;

    @ForeignKey(() => Vacation)
    @AllowNull(false)
    @Column(DataType.UUID)
    vacationId: string

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Vacation)
    vacation: Vacation;
}

