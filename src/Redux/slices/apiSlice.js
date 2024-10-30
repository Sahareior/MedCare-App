import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// 192.168.242.75

export const allApislice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "https://adhe.vercel.app"}),
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => '/doctors'
        }),

        postAppointment: builder.mutation({
            query:(data)=> ({
                url: '/appointment',
                method: 'POST',
                body: data
            })
        }),
        postNewDoc: builder.mutation({
            query:(data)=> ({
                url: '/doctors',
                method: 'POST',
                body: data
            })
        }),
        getAppointment: builder.query({
            query:(email)=>({
                url: `/appointment/${email}`
            })
        }),

        removeDoctor: builder.mutation({
            query:(id) => ({
                url:"/doctors",
                method: 'DELETE',
                body: id
            }) 
        })
    })

});

export const { useGetDoctorsQuery,usePostAppointmentMutation,usePostNewDocMutation, useGetAppointmentQuery, useRemoveDoctorMutation  } = allApislice;