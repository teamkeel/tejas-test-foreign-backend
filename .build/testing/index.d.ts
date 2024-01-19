/// <reference path="@teamkeel/functions-runtime/index.d.ts" /
import * as sdk from "@teamkeel/sdk";
import * as runtime from "@teamkeel/functions-runtime";
import "@teamkeel/testing-runtime";

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
    id?: string;
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
declare class ActionExecutor {
    withIdentity(identity: sdk.Identity): ActionExecutor;
    withAuthToken(token: string): ActionExecutor;
    listVoucherCodes(i?: ListVoucherCodesInput): Promise<{results: sdk.VoucherCode[], pageInfo: runtime.PageInfo}>;
    getVoucherCode(i: GetVoucherCodeInput): Promise<sdk.VoucherCode | null>;
    createVoucherCode(i: CreateVoucherCodeInput): Promise<sdk.VoucherCode>;
    updateVoucherCode(i: UpdateVoucherCodeInput): Promise<sdk.VoucherCode>;
    deleteVoucherCode(i: DeleteVoucherCodeInput): Promise<string>;
    listProducts(i?: ListProductsInput): Promise<{results: sdk.Product[], pageInfo: runtime.PageInfo}>;
    getProduct(i?: GetProductInput): Promise<sdk.Product | null>;
    listVoucherCodeProducts(i?: ListVoucherCodeProductsInput): Promise<{results: sdk.VoucherCodeProducts[], pageInfo: runtime.PageInfo}>;
    getVoucherCodeProduct(i: GetVoucherCodeProductInput): Promise<sdk.VoucherCodeProducts | null>;
    createVoucherCodeProduct(i: CreateVoucherCodeProductInput): Promise<sdk.VoucherCodeProducts>;
    updateVoucherCodeProduct(i: UpdateVoucherCodeProductInput): Promise<sdk.VoucherCodeProducts>;
    deleteVoucherCodeProduct(i: DeleteVoucherCodeProductInput): Promise<string>;
    authenticate(i: AuthenticateInput): Promise<AuthenticateResponse>;
    requestPasswordReset(i: RequestPasswordResetInput): Promise<RequestPasswordResetResponse>;
    resetPassword(i: ResetPasswordInput): Promise<ResetPasswordResponse>;
}
export declare const actions: ActionExecutor;
export declare const models: sdk.ModelsAPI;
export declare function resetDatabase(): Promise<void>;
