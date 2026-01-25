export interface BaseRepository<TEntity, TCreate, TUpdate, TId = string> {
  findById(id: TId): Promise<TEntity | null>
  findMany(params?: FindManyParams<TEntity>): Promise<TEntity[]>
  create(data: TCreate): Promise<TEntity>
  update(id: TId, data: TUpdate): Promise<TEntity | null>
  delete(id: TId): Promise<boolean>
}

export interface FindManyParams<TEntity> {
  limit?: number
  offset?: number
  orderBy?: keyof TEntity | [keyof TEntity, 'asc' | 'desc'][]
  where?: Partial<TEntity> | Record<string, any>
}
