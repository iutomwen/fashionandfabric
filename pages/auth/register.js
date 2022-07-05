import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  LoadingOverlay,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from "@mantine/core";

import { GoogleButton, TwitterButton } from "@/components/Global/SocialButtons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { checkAccountSession } from "@/utils/services";
import { fetchAccountDetails } from "@/utils/slices/accountSlice";
import withGuest from "@/components/Auth/withGuest";
function RegisterPage(props) {
  const { account } = useSelector((state) => state.account);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (Object.keys(account).length === 0) {
      setVisible(false);
    }
  }, [account]);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center my-20 relative">
      <LoadingOverlay visible={visible} />
      <Paper radius="md" p="md" m={"md"} withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to FnF, register with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Group direction="column" grow>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />

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

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
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
              Already have an account? Login
            </Anchor>
            <Button type="submit">{upperFirst("register")}</Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default withGuest(RegisterPage);
