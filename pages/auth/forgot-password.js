import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from "@mantine/core";
import { useRouter } from "next/router";
function ForgotPassword(props) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
    },
  });

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <Paper radius="md" p="xl" m={"xl"} withBorder {...props}>
        <Text size="lg" weight={500}>
          Password Reset
        </Text>

        <Divider labelPosition="center" my="lg" />
        <form onSubmit={form.onSubmit(() => {})}>
          <Group direction="column" grow>
            <TextInput
              required
              label="Email"
              placeholder="hello@example.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />
          </Group>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={() => router.push("/")}
              size="xs"
            >
              Login Instead?
            </Anchor>
            <Button type="submit">Reset Password</Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default ForgotPassword;
