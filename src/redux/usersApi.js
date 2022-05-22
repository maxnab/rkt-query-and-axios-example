import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['users'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/'}),
  endpoints: (build) => ({
    getUsers: build.query({
      //query: () => '/users',
      // query: (limit = '') => `/users?${limit && `_limit=${limit}`}`,
      query: (limit = '') => `/users?_limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'users', id })),
            { type: 'users', id: 'LIST' },
          ]
          : [{ type: 'users', id: 'LIST' }],
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'users', id: 'LIST'}]
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'users', id: 'LIST'}]
    })
  })
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = usersApi;