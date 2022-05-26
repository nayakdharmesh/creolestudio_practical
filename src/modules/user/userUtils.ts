import * as sql from "jm-ez-mysql";
import { Tables } from "../../config/tables";
import { ResponseBuilder } from "../../helpers/responseBuilder";

export class userUtils {
  public async createUser(userDetail: Json): Promise<ResponseBuilder> {
    const newUser = await sql.insert(Tables.CUSTOMER, userDetail);
    return ResponseBuilder.data({ id: newUser.insertId });
  }

  public async getUserDetailByEmail(email: string): Promise<ResponseBuilder> {
    const model = `${Tables.CUSTOMER}`;
    const user = await sql.first(model, ["*"], "email = ? AND isActive = '1'", [
      email,
    ]);
    return ResponseBuilder.data(user);
  }
  public async getUserDetailById(id: number): Promise<ResponseBuilder> {
    const model = `${Tables.CUSTOMER}`;
    const user = await sql.first(model, ["*"], "id = ? AND isActive = '1'", [
      id,
    ]);
    return ResponseBuilder.data(user);
  }

  public async updateById(id: number, data: Json) {
    const model = `${Tables.CUSTOMER}`;
    return await sql.updateFirst(model, data, "id = ?", [id]);
  }

  public async insertAddress(data: Json) {
    const model = `${Tables.CUSTOMERHASADDRESS}`;
    return await sql.insertMany(model, data);
  }

  public async getAddress(id: number): Promise<ResponseBuilder> {
    const model = `${Tables.CUSTOMERHASADDRESS}`;
    const data = await sql.findAll(
      model,
      ["*"],
      "customerId = ? AND isDelete = '0' ",
      [id]
    );
    return ResponseBuilder.data(data);
  }

    public async updateAddress(id: number,data:Json) {
    const model = `${Tables.CUSTOMERHASADDRESS}`;
    return await sql.updateFirst(model, data, "id = ?", [id]);
  }
}
