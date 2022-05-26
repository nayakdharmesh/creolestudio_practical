import {  ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as My from "jm-ez-mysql";
import { Tables } from "../../config/tables";


@ValidatorConstraint({ async: true })
export class IsEmailemailExistConstraint implements ValidatorConstraintInterface {
  public async validate(email: string) {
    const user = await My.first(Tables.CUSTOMER, ["id"], "email = ?", [email]);
    return user ? false : true;
  }
  
}
