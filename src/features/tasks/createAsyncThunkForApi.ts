import { createAsyncThunk } from "@reduxjs/toolkit";

export function createAsyncThunkForApi<ReturnedType, ArgType = void> (
    typePrefix: string,
    apiFn: (arg: ArgType) => Promise<ReturnedType>
) {
    return createAsyncThunk(typePrefix, async (arg: ArgType) => {
        const result = await apiFn(arg);
        return result;
    });
}