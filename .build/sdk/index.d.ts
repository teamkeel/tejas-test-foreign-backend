import { Kysely, Generated } from "kysely"
import * as runtime from "@teamkeel/functions-runtime"
import { Headers } from 'node-fetch'

export type SortDirection = "asc" | "desc" | "ASC" | "DESC"
export interface ListVoucherCodesWhere {
}
export interface ListVoucherCodesInput {
    where?: ListVoucherCodesWhere;
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}
export interface GetVoucherCodeInput {
    code: string;
}
export interface CreateVoucherCodeInput {
    code: string;
    validFrom: Date;
    discountPercent: number;
}
export interface UpdateVoucherCodeWhere {
    id: string;
}
export interface UpdateVoucherCodeValues {
    code: string;
    validFrom: Date;
    validUntil: Date | null;
    discountPercent: number;
}
export interface UpdateVoucherCodeInput {
    where: UpdateVoucherCodeWhere;
    values: UpdateVoucherCodeValues;
}
export interface DeleteVoucherCodeInput {
    id: string;
}
export interface ListProductsWhere {
}
export interface ListProductsInput {
    where?: ListProductsWhere;
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}
export interface GetProductInput {
    id: string;
}
export interface ListVoucherCodeProductsWhere {
}
export interface ListVoucherCodeProductsInput {
    where?: ListVoucherCodeProductsWhere;
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}
export interface GetVoucherCodeProductInput {
    id: string;
}
export interface CreateVoucherCodeProductInput {
    voucherCode: CreateVoucherCodeProductVoucherCodeInput;
    foreignProductId: CreateVoucherCodeProductForeignProductIdInput | null;
}
export interface CreateVoucherCodeProductVoucherCodeInput {
    id: string;
}
export interface CreateVoucherCodeProductForeignProductIdInput {
    foreignId: number;
}
export interface UpdateVoucherCodeProductWhere {
    id: string;
}
export interface UpdateVoucherCodeProductValues {
    voucherCode: UpdateVoucherCodeProductVoucherCodeInput;
    foreignProductId: UpdateVoucherCodeProductForeignProductIdInput | null;
}
export interface UpdateVoucherCodeProductVoucherCodeInput {
    id: string;
}
export interface UpdateVoucherCodeProductForeignProductIdInput {
    foreignId: number;
}
export interface UpdateVoucherCodeProductInput {
    where: UpdateVoucherCodeProductWhere;
    values: UpdateVoucherCodeProductValues;
}
export interface DeleteVoucherCodeProductInput {
    id: string;
}
export interface EmailPasswordInput {
    email: string;
    password: string;
}
export interface AuthenticateInput {
    createIfNotExists?: boolean;
    emailPassword: EmailPasswordInput;
}
export interface AuthenticateResponse {
    identityCreated: boolean;
    token: string;
}
export interface RequestPasswordResetInput {
    email: string;
    redirectUrl: string;
}
export interface RequestPasswordResetResponse {
}
export interface ResetPasswordInput {
    token: string;
    password: string;
}
export interface ResetPasswordResponse {
}
/**
 * The available hooks for a 'get' function
 * @typeParam M - The Model this function is declared in
 * @typeParam QB - The QueryBuilder type for the model
 * @typeParam I - The function inputs
 */
type GetFunctionHooks<M, QB, I> = {
  beforeQuery?: (
    ctx: ContextAPI,
    inputs: I,
    query: QB
  ) => Promise<QB | M | null> | QB | M | null;
  afterQuery?: (ctx: ContextAPI, inputs: I, record: M) => Promise<M> | M;
};

/**
 * The available hooks for a 'list' function
 * @typeParam M - The Model this function is declared in
 * @typeParam QB - The QueryBuilder type for the model
 * @typeParam I - The function inputs
 */
type ListFunctionHooks<M, QB, I> = {
  beforeQuery?: (
    ctx: ContextAPI,
    inputs: I,
    query: QB
  ) => Promise<QB | Array<M>> | QB | Array<M>;
  afterQuery?: (
    ctx: ContextAPI,
    inputs: I,
    records: Array<M>
  ) => Promise<Array<M>> | Array<M>;
};

/**
 * The available hooks for a 'create' function
 * @typeParam M - The Model this function is declared in
 * @typeParam QB - The QueryBuilder type for the model
 * @typeParam I - The function inputs
 * @typeParam I - The values that have been derived from the inputs
 * @typeParam C - The values that will be used to create an M record
 */
type CreateFunctionHooks<M, QB, I, V, C> = {
  beforeWrite?: (ctx: ContextAPI, inputs: I, values: V) => Promise<C> | C;
  afterWrite?: (
    ctx: ContextAPI,
    inputs: I,
    data: M
  ) => Promise<M | void> | M | void;
};

/**
 * The available hooks for a 'create' function
 * @typeParam M - The Model this function is declared in
 * @typeParam QB - The QueryBuilder type for the model
 * @typeParam I - The function inputs
 * @typeParam C - The values that can be used to update an M record
 */
type UpdateFunctionHooks<M, QB, I, V> = {
  beforeQuery?: (
    ctx: ContextAPI,
    inputs: I,
    query: QB
  ) => Promise<M | QB> | M | QB;
  beforeWrite?: (
    ctx: ContextAPI,
    inputs: I,
    values: V,
    record: M
  ) => Promise<Partial<M>> | Partial<M>;
  afterWrite?: (
    ctx: ContextAPI,
    inputs: I,
    data: M
  ) => Promise<M | void> | M | void;
};

/**
 * The available hooks for a 'delete' function
 * @typeParam M - The Model this function is declared in
 * @typeParam QB - The QueryBuilder type for the model
 * @typeParam I - The function inputs
 */
type DeleteFunctionHooks<M, QB, I> = {
  beforeQuery?: (
    ctx: ContextAPI,
    inputs: I,
    query: QB
  ) => Promise<M | QB> | M | QB;
  beforeWrite?: (ctx: ContextAPI, inputs: I, record: M) => Promise<void> | void;
  afterWrite?: (ctx: ContextAPI, inputs: I, data: M) => Promise<void> | void;
};

export interface VoucherCodeTable {
    code: string
    validFrom: Date
    validUntil: Date | null
    discountPercent: number
    id: Generated<string>
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}
export interface VoucherCode {
    code: string
    validFrom: Date
    validUntil: Date | null
    discountPercent: number
    id: string
    createdAt: Date
    updatedAt: Date
}
export type VoucherCodeCreateValues = {
    code: string
    validFrom: Date
    validUntil?: Date | null
    discountPercent: number
    id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface VoucherCodeWhereConditions {
    code?: string | runtime.StringWhereCondition;
    validFrom?: Date | runtime.DateWhereCondition;
    validUntil?: Date | runtime.DateWhereCondition | null;
    discountPercent?: number | runtime.NumberWhereCondition;
    id?: string | runtime.IDWhereCondition;
    createdAt?: Date | runtime.DateWhereCondition;
    updatedAt?: Date | runtime.DateWhereCondition;
}
export type VoucherCodeOrderBy = {
    code?: SortDirection,
    validFrom?: SortDirection,
    validUntil?: SortDirection,
    discountPercent?: SortDirection,
    id?: SortDirection,
    createdAt?: SortDirection,
    updatedAt?: SortDirection
}

export interface VoucherCodeFindManyParams {
    where?: VoucherCodeWhereConditions;
    limit?: number;
    offset?: number;
    orderBy?: VoucherCodeOrderBy;
}
export type VoucherCodeUniqueConditions = 
    | {code: string}
    | {id: string};
export type VoucherCodeAPI = {
    /**
    * Create a VoucherCode record
    * @example
    ```typescript
    const record = await models.voucherCode.create({
        code: '',
        validFrom: new Date(),
        discountPercent: 0
    });
    ```
    */
    create(values: VoucherCodeCreateValues): Promise<VoucherCode>;
    /**
    * Update a VoucherCode record
    * @example
    ```typescript
    const voucherCode = await models.voucherCode.update({ id: "abc" }, { code: XXX }});
    ```
    */
    update(where: VoucherCodeUniqueConditions, values: Partial<VoucherCode>): Promise<VoucherCode>;
    /**
    * Deletes a VoucherCode record
    * @example
    ```typescript
    const deletedId = await models.voucherCode.delete({ id: 'xxx' });
    ```
    */
    delete(where: VoucherCodeUniqueConditions): Promise<string>;
    /**
    * Finds a single VoucherCode record
    * @example
    ```typescript
    const voucherCode = await models.voucherCode.findOne({ id: 'xxx' });
    ```
    */
    findOne(where: VoucherCodeUniqueConditions): Promise<VoucherCode | null>;
    /**
    * Finds multiple VoucherCode records
    * @example
    ```typescript
    const voucherCodes = await models.voucherCode.findMany({ where: { createdAt: { after: new Date(2022, 1, 1) } }, orderBy: { id: 'asc' }, limit: 1000, offset: 50 });
    ```
    */
    findMany(params?: VoucherCodeFindManyParams | undefined): Promise<VoucherCode[]>;
    /**
    * Creates a new query builder with the given conditions applied
    * @example
    ```typescript
    const records = await models.voucherCode.where({ createdAt: { after: new Date(2020, 1, 1) } }).orWhere({ updatedAt: { after: new Date(2020, 1, 1) } }).findMany();
    ```
    */
    where(where: VoucherCodeWhereConditions): VoucherCodeQueryBuilder;
}
export type VoucherCodeQueryBuilderParams = {
    limit?: number;
    offset?: number;
    orderBy?: VoucherCodeOrderBy;
}
export type VoucherCodeQueryBuilder = {
    where(where: VoucherCodeWhereConditions): VoucherCodeQueryBuilder;
    orWhere(where: VoucherCodeWhereConditions): VoucherCodeQueryBuilder;
    findMany(params?: VoucherCodeQueryBuilderParams): Promise<VoucherCode[]>;
    findOne(params?: VoucherCodeQueryBuilderParams): Promise<VoucherCode>;
    delete() : Promise<string>;
    update(values: Partial<VoucherCode>) : Promise<VoucherCode>;
}
export declare function GetVoucherCode(hooks?: GetVoucherCodeHooks): void
export type GetVoucherCodeHooks = GetFunctionHooks<VoucherCode, VoucherCodeQueryBuilder, GetVoucherCodeInput>;

export interface ProductTable {
    foreignId: number
    name: string
    description: string
    price: string
    foreignCreatedAt: string
    id: Generated<string>
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}
export interface Product {
    foreignId: number
    name: string
    description: string
    price: string
    foreignCreatedAt: string
    id: string
    createdAt: Date
    updatedAt: Date
}
export type ProductCreateValues = {
    foreignId: number
    name: string
    description: string
    price: string
    foreignCreatedAt: string
    id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface ProductWhereConditions {
    foreignId?: number | runtime.NumberWhereCondition;
    name?: string | runtime.StringWhereCondition;
    description?: string | runtime.StringWhereCondition;
    price?: string | runtime.StringWhereCondition;
    foreignCreatedAt?: string | runtime.StringWhereCondition;
    id?: string | runtime.IDWhereCondition;
    createdAt?: Date | runtime.DateWhereCondition;
    updatedAt?: Date | runtime.DateWhereCondition;
}
export type ProductOrderBy = {
    foreignId?: SortDirection,
    name?: SortDirection,
    description?: SortDirection,
    price?: SortDirection,
    foreignCreatedAt?: SortDirection,
    id?: SortDirection,
    createdAt?: SortDirection,
    updatedAt?: SortDirection
}

export interface ProductFindManyParams {
    where?: ProductWhereConditions;
    limit?: number;
    offset?: number;
    orderBy?: ProductOrderBy;
}
export type ProductUniqueConditions = 
    | {foreignId: number}
    | {id: string};
export type ProductAPI = {
    /**
    * Create a Product record
    * @example
    ```typescript
    const record = await models.product.create({
        foreignId: 0,
        name: '',
        description: '',
        price: '',
        foreignCreatedAt: ''
    });
    ```
    */
    create(values: ProductCreateValues): Promise<Product>;
    /**
    * Update a Product record
    * @example
    ```typescript
    const product = await models.product.update({ id: "abc" }, { foreignId: XXX }});
    ```
    */
    update(where: ProductUniqueConditions, values: Partial<Product>): Promise<Product>;
    /**
    * Deletes a Product record
    * @example
    ```typescript
    const deletedId = await models.product.delete({ id: 'xxx' });
    ```
    */
    delete(where: ProductUniqueConditions): Promise<string>;
    /**
    * Finds a single Product record
    * @example
    ```typescript
    const product = await models.product.findOne({ id: 'xxx' });
    ```
    */
    findOne(where: ProductUniqueConditions): Promise<Product | null>;
    /**
    * Finds multiple Product records
    * @example
    ```typescript
    const products = await models.product.findMany({ where: { createdAt: { after: new Date(2022, 1, 1) } }, orderBy: { id: 'asc' }, limit: 1000, offset: 50 });
    ```
    */
    findMany(params?: ProductFindManyParams | undefined): Promise<Product[]>;
    /**
    * Creates a new query builder with the given conditions applied
    * @example
    ```typescript
    const records = await models.product.where({ createdAt: { after: new Date(2020, 1, 1) } }).orWhere({ updatedAt: { after: new Date(2020, 1, 1) } }).findMany();
    ```
    */
    where(where: ProductWhereConditions): ProductQueryBuilder;
}
export type ProductQueryBuilderParams = {
    limit?: number;
    offset?: number;
    orderBy?: ProductOrderBy;
}
export type ProductQueryBuilder = {
    where(where: ProductWhereConditions): ProductQueryBuilder;
    orWhere(where: ProductWhereConditions): ProductQueryBuilder;
    findMany(params?: ProductQueryBuilderParams): Promise<Product[]>;
    findOne(params?: ProductQueryBuilderParams): Promise<Product>;
    delete() : Promise<string>;
    update(values: Partial<Product>) : Promise<Product>;
}
export declare function ListProducts(hooks?: ListProductsHooks): void
export type ListProductsHooks = ListFunctionHooks<Product, ProductQueryBuilder, ListProductsInput>;

export declare function GetProduct(hooks?: GetProductHooks): void
export type GetProductHooks = GetFunctionHooks<Product, ProductQueryBuilder, GetProductInput>;

export interface VoucherCodeProductsTable {
    id: Generated<string>
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
    voucherCodeId: string
    foreignProductIdId: string | null
}
export interface VoucherCodeProducts {
    id: string
    createdAt: Date
    updatedAt: Date
    voucherCodeId: string
    foreignProductIdId: string | null
}
export type VoucherCodeProductsCreateValues = {
    // if providing a value for this field do not also set foreignProductIdId
    foreignProductId?: ProductCreateValues | {id: string} | null
    id?: string
    createdAt?: Date
    updatedAt?: Date
    // if providing a value for this field do not also set foreignProductId
    foreignProductIdId?: string | null
} & (
    // Either voucherCode or voucherCodeId can be provided but not both
    | {voucherCode: VoucherCodeCreateValues | {id: string}, voucherCodeId?: undefined}
    | {voucherCodeId: string, voucherCode?: undefined}
)

export interface VoucherCodeProductsWhereConditions {
    voucherCode?: VoucherCodeWhereConditions;
    foreignProductId?: ProductWhereConditions | null;
    id?: string | runtime.IDWhereCondition;
    createdAt?: Date | runtime.DateWhereCondition;
    updatedAt?: Date | runtime.DateWhereCondition;
    voucherCodeId?: string | runtime.IDWhereCondition;
    foreignProductIdId?: string | runtime.IDWhereCondition | null;
}
export type VoucherCodeProductsOrderBy = {
    id?: SortDirection,
    createdAt?: SortDirection,
    updatedAt?: SortDirection,
    voucherCodeId?: SortDirection,
    foreignProductIdId?: SortDirection
}

export interface VoucherCodeProductsFindManyParams {
    where?: VoucherCodeProductsWhereConditions;
    limit?: number;
    offset?: number;
    orderBy?: VoucherCodeProductsOrderBy;
}
export type VoucherCodeProductsUniqueConditions = 
    | {id: string};
export type VoucherCodeProductsAPI = {
    /**
    * Create a VoucherCodeProducts record
    * @example
    ```typescript
    const record = await models.voucherCodeProducts.create({
        voucherCode: undefined,
        voucherCodeId: undefined
    });
    ```
    */
    create(values: VoucherCodeProductsCreateValues): Promise<VoucherCodeProducts>;
    /**
    * Update a VoucherCodeProducts record
    * @example
    ```typescript
    const voucherCodeProducts = await models.voucherCodeProducts.update({ id: "abc" }, { voucherCode: XXX }});
    ```
    */
    update(where: VoucherCodeProductsUniqueConditions, values: Partial<VoucherCodeProducts>): Promise<VoucherCodeProducts>;
    /**
    * Deletes a VoucherCodeProducts record
    * @example
    ```typescript
    const deletedId = await models.voucherCodeProducts.delete({ id: 'xxx' });
    ```
    */
    delete(where: VoucherCodeProductsUniqueConditions): Promise<string>;
    /**
    * Finds a single VoucherCodeProducts record
    * @example
    ```typescript
    const voucherCodeProducts = await models.voucherCodeProducts.findOne({ id: 'xxx' });
    ```
    */
    findOne(where: VoucherCodeProductsUniqueConditions): Promise<VoucherCodeProducts | null>;
    /**
    * Finds multiple VoucherCodeProducts records
    * @example
    ```typescript
    const voucherCodeProductss = await models.voucherCodeProducts.findMany({ where: { createdAt: { after: new Date(2022, 1, 1) } }, orderBy: { id: 'asc' }, limit: 1000, offset: 50 });
    ```
    */
    findMany(params?: VoucherCodeProductsFindManyParams | undefined): Promise<VoucherCodeProducts[]>;
    /**
    * Creates a new query builder with the given conditions applied
    * @example
    ```typescript
    const records = await models.voucherCodeProducts.where({ createdAt: { after: new Date(2020, 1, 1) } }).orWhere({ updatedAt: { after: new Date(2020, 1, 1) } }).findMany();
    ```
    */
    where(where: VoucherCodeProductsWhereConditions): VoucherCodeProductsQueryBuilder;
}
export type VoucherCodeProductsQueryBuilderParams = {
    limit?: number;
    offset?: number;
    orderBy?: VoucherCodeProductsOrderBy;
}
export type VoucherCodeProductsQueryBuilder = {
    where(where: VoucherCodeProductsWhereConditions): VoucherCodeProductsQueryBuilder;
    orWhere(where: VoucherCodeProductsWhereConditions): VoucherCodeProductsQueryBuilder;
    findMany(params?: VoucherCodeProductsQueryBuilderParams): Promise<VoucherCodeProducts[]>;
    findOne(params?: VoucherCodeProductsQueryBuilderParams): Promise<VoucherCodeProducts>;
    delete() : Promise<string>;
    update(values: Partial<VoucherCodeProducts>) : Promise<VoucherCodeProducts>;
}
export interface IdentityTable {
    email: string | null
    emailVerified: Generated<boolean>
    password: any | null
    externalId: string | null
    issuer: string | null
    id: Generated<string>
    createdAt: Generated<Date>
    updatedAt: Generated<Date>
}
export interface Identity {
    email: string | null
    emailVerified: boolean
    password: any | null
    externalId: string | null
    issuer: string | null
    id: string
    createdAt: Date
    updatedAt: Date
}
export type IdentityCreateValues = {
    email?: string | null
    emailVerified?: boolean
    password?: any | null
    externalId?: string | null
    issuer?: string | null
    id?: string
    createdAt?: Date
    updatedAt?: Date
}

export interface IdentityWhereConditions {
    email?: string | runtime.StringWhereCondition | null;
    emailVerified?: boolean | runtime.BooleanWhereCondition;
    password?: any | any | null;
    externalId?: string | runtime.StringWhereCondition | null;
    issuer?: string | runtime.StringWhereCondition | null;
    id?: string | runtime.IDWhereCondition;
    createdAt?: Date | runtime.DateWhereCondition;
    updatedAt?: Date | runtime.DateWhereCondition;
}
export type IdentityOrderBy = {
    email?: SortDirection,
    emailVerified?: SortDirection,
    externalId?: SortDirection,
    issuer?: SortDirection,
    id?: SortDirection,
    createdAt?: SortDirection,
    updatedAt?: SortDirection
}

export interface IdentityFindManyParams {
    where?: IdentityWhereConditions;
    limit?: number;
    offset?: number;
    orderBy?: IdentityOrderBy;
}
export type IdentityUniqueConditions = 
    | {email: string, issuer: string}
    | {id: string};
export type IdentityAPI = {
    /**
    * Create a Identity record
    * @example
    ```typescript
    const record = await models.identity.create({
    });
    ```
    */
    create(values: IdentityCreateValues): Promise<Identity>;
    /**
    * Update a Identity record
    * @example
    ```typescript
    const identity = await models.identity.update({ id: "abc" },  {}});
    ```
    */
    update(where: IdentityUniqueConditions, values: Partial<Identity>): Promise<Identity>;
    /**
    * Deletes a Identity record
    * @example
    ```typescript
    const deletedId = await models.identity.delete({ id: 'xxx' });
    ```
    */
    delete(where: IdentityUniqueConditions): Promise<string>;
    /**
    * Finds a single Identity record
    * @example
    ```typescript
    const identity = await models.identity.findOne({ id: 'xxx' });
    ```
    */
    findOne(where: IdentityUniqueConditions): Promise<Identity | null>;
    /**
    * Finds multiple Identity records
    * @example
    ```typescript
    const identitys = await models.identity.findMany({ where: { createdAt: { after: new Date(2022, 1, 1) } }, orderBy: { id: 'asc' }, limit: 1000, offset: 50 });
    ```
    */
    findMany(params?: IdentityFindManyParams | undefined): Promise<Identity[]>;
    /**
    * Creates a new query builder with the given conditions applied
    * @example
    ```typescript
    const records = await models.identity.where({ createdAt: { after: new Date(2020, 1, 1) } }).orWhere({ updatedAt: { after: new Date(2020, 1, 1) } }).findMany();
    ```
    */
    where(where: IdentityWhereConditions): IdentityQueryBuilder;
}
export type IdentityQueryBuilderParams = {
    limit?: number;
    offset?: number;
    orderBy?: IdentityOrderBy;
}
export type IdentityQueryBuilder = {
    where(where: IdentityWhereConditions): IdentityQueryBuilder;
    orWhere(where: IdentityWhereConditions): IdentityQueryBuilder;
    findMany(params?: IdentityQueryBuilderParams): Promise<Identity[]>;
    findOne(params?: IdentityQueryBuilderParams): Promise<Identity>;
    delete() : Promise<string>;
    update(values: Partial<Identity>) : Promise<Identity>;
}
interface database {
    voucher_code: VoucherCodeTable;
    product: ProductTable;
    voucher_code_products: VoucherCodeProductsTable;
    identity: IdentityTable;
}
export declare function useDatabase(): Kysely<database>;
export type ModelsAPI = {
    voucherCode: VoucherCodeAPI;
    product: ProductAPI;
    voucherCodeProducts: VoucherCodeProductsAPI;
    identity: IdentityAPI;
}
export declare const models: ModelsAPI;
export declare const permissions: runtime.Permissions;
type Environment = {
}
type Secrets = {
}

export interface ContextAPI extends runtime.ContextAPI {
    secrets: Secrets;
    env: Environment;
    identity?: Identity;
    now(): Date;
}
export interface JobContextAPI {
    secrets: Secrets;
    env: Environment;
    identity?: Identity;
    now(): Date;
}
export interface SubscriberContextAPI {
    secrets: Secrets;
    env: Environment;
    now(): Date;
}
