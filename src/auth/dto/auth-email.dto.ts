import { PickType } from "@nestjs/mapped-types";
import { LoginDto } from "./login.dto";

export class AuthEmailDto extends PickType(LoginDto , ['email']){}