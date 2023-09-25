import { userApi } from '../api/user'
import { User } from '../../types/user'

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

interface Post {
  id: number
  name: string
}

const postApi = userApi.injectEndpoints({
  endpoints: (build) => ({
    updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/v0/posts/${id}`,
          method: 'PUT',
          body,
        }
      },
      //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      },
      //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdatePostMutation, useDeletePostMutation } = postApi
