import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { supabase } from '../../libs/supabaseClient';
import { Button, Divider, Box, Grid, Container, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { Store } from '../../utils/Store';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
const defaultValues = {
    name: "",
    category: [],
};
export default function AddSubCategory({ onClick }) {
    const [loading, setLoading] = useState(false);
    const [close, setClose] = useState(false);
    const { state, dispatch } = useContext(Store);
    const { categories } = state;
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const SubmitHandler = async ({
        name,
        category,

    }) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("sub_category").insert([
                {
                    name,
                    category_id: category,
                    created_at: new Date(),
                },
            ]);

            if (error) throw error;
            if (data) {
                onClick()
                toast.success("Sub Category Added successfully")
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            onClick()
            setLoading(false);
            reset(defaultValues);
        }
    };
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit(SubmitHandler)} noValidate sx={{ mt: 3 }}>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="category"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        label="Select Category"
                                        id="category"
                                        select
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        error={Boolean(errors.category)}
                                        helperText={
                                            errors.category
                                                ? errors.category.type === "required"
                                                    ? "Please select a category"
                                                    : "Product category is required"
                                                : ""
                                        }
                                        {...field}
                                    >
                                        <option value=""></option>
                                        {categories?.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </TextField>
                                )}
                            ></Controller>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 3,
                                }}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        inputProps={{ type: "text" }}
                                        label="Sub Category Name"
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors.name
                                                ? errors.name.type === "minLength"
                                                    ? "Min chars is 3"
                                                    : "Category name is required"
                                                : ""
                                        }
                                        {...field}
                                    />
                                )}
                            ></Controller>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClick}>Cancel</Button>
                    <Button type="submit" >Submit</Button>
                </DialogActions>
            </Box>
        </div>
    )
}

