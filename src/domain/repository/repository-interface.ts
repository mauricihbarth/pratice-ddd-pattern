export default interface RepositoryInterface<T>{
    create(entity:T):Promise<void>;
    update(entity:T):Promise<void>;
    find(entity:string):Promise<T>;
    findAll(entity:T):Promise<T[]>;
}
