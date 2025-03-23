import { 
    AllowNull, 
    Column, 
    DataType, 
    Default, 
    Model, 
    PrimaryKey, 
    Table 
} from "sequelize-typescript";

@Table({
    underscored: true,
})
export default class Vacation extends Model{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    vacationId: string

    @AllowNull(false)
    @Column
    vacationDestination: string

    @AllowNull(false)
    @Column
    vacationDescription: string

    @AllowNull(false)
    @Column(DataType.DATE)
    vacationDateStart: Date
    
    @AllowNull(false)
    @Column(DataType.DATE)
    vacationDateEnd: Date
    
    @AllowNull(false)
    @Column(DataType.DECIMAL)
    price: number;

    @AllowNull(false)
    @Column
    imgFileName: string
}
