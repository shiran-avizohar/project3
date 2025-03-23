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
export default class User extends Model{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    userId: string

    @AllowNull(false)
    @Column
    firstName: string

    @AllowNull(false)
    @Column
    lastName: string

    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @AllowNull(false)
    @Column(DataType.ENUM("user", "admin"))
    role: string
}
