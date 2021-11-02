import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { supabase } from '../../libs/supabaseClient';
import { Button, Divider, Box, Grid, Container, TextField } from '@mui/material';
import toast from 'react-hot-toast';
const defaultValues = {
    name: "",
};
export default function AddCategory({ onClick }) {
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const SubmitHandler = async ({
        name,

    }) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("category").insert([
                {
                    name,
                    created_at: new Date(),
                },
            ]);

            if (error) throw error;
            if (data) {
                onClick();
                toast.success("Category Added successfully")
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            onClick();
            setLoading(false);
            reset(defaultValues);
        }
    };
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit(SubmitHandler)} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={3}>
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
                                    label="Category Name"
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
                    <Grid item md={12} xs={12}>
                        <Divider />
                        <Container
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                p: 2,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="text"
                                onClick={() => { }}
                            >
                                Create Category
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

