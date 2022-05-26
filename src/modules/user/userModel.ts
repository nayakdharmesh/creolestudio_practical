import { IsEmail, IsNotEmpty, IsOptional, Validate } from "class-validator";
import { Model } from "../../model";
import { IsEmailemailExistConstraint } from "./userValidator";

export class UserModel extends Model {
  @IsNotEmpty()
  public fName: string;

  @IsNotEmpty()
  public lName: string;

  @IsEmail({}, { message: "EMAIL_INVALID" })
  @Validate(IsEmailemailExistConstraint, {
    message: "Email address already exists",
  })
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public gender: string;

  constructor(body: any) {
    super();
    const { fName, lName, email, password, gender } = body;
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.password = password;
    this.gender = gender;
  }
}

export class LoginModel extends Model {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  constructor(body: any) {
    super();
    const { email, password } = body;
    this.email = email;
    this.password = password;
  }
}

export class UpdateUserModel extends Model {
  @IsOptional()
  public fName: string;

  @IsOptional()
  public lName: string;

  @IsOptional()
  public gender: string;

  @IsOptional()
  public profilePic: string;

  constructor(body: any) {
    super();
    const { fName, lName, profilePic, gender } = body;
    this.fName = fName;
    this.lName = lName;
    this.profilePic = profilePic;
    this.gender = gender;
  }
}

export class ChangePasswordModel extends Model {
  @IsNotEmpty()
  public oldPassword: string;

  @IsNotEmpty()
  public newPassword: string;

  constructor(body: any) {
    super();
    const { oldPassword, newPassword } = body;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

export class CreateAddressModel extends Model {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public addressLine1: string;
  @IsOptional()
  public addressLine2: string;
  @IsNotEmpty()
  public country: string;
  @IsNotEmpty()
  public state: string;
  @IsNotEmpty()
  public city: string;
  @IsNotEmpty()
  public pincode: string;

  constructor(body: any) {
    super();
    const { title, addressLine1, addressLine2, country, state, city, pincode } =
      body;
    this.title = title;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.country = country;
    this.state = state;
    this.city = city;
    this.pincode = pincode;
  }
}
