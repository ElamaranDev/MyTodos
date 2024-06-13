import { apiSlice } from "./apiSlice";

const TODOS_URL = "/api/users/todos";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: TODOS_URL,
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    getTodoById: builder.query({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Todos", id }],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: TODOS_URL,
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, updatedTodo }) => ({
        url: `${TODOS_URL}/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
} = todoApiSlice;
