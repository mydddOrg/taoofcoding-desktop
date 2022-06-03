import "reflect-metadata";
import { container } from "tsyringe";
import { constructor } from "tsyringe/dist/typings/types";

export class InstanceFactory {

  public static getInstance<T>(type:constructor<T>): T {
    return container.resolve(type);
  }
}
