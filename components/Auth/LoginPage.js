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
import { GoogleButton, TwitterButton } from "../Global/SocialButtons";
import { useRouter } from "next/router";
import { checkUser, loginUser, signOutUser } from "@/utils/services";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { fetchAccountDetails } from "@/utils/slices/accountSlice";
export function LoginPage(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const handleLogin = async () => {
    setLoading(true);
    setVisible(true);
    const { email, password } = form.values;
    try {
      const {
        user,
        session,
        error: loginErr,
      } = await loginUser(email, password);
      if (loginErr) throw loginErr;
      if (user) {
        const { role, error: errs } = await checkUser(user?.id);
        if (errs) throw error;
        if (role === "personal" || role === "business") {
          const { error: err } = await signOutUser();
          setLoading(false);
          showNotification({
            title: "Un-authorized",
            message: "This account has no permission to access this dashboard!",
            color: "yellow",
          });
          //   router.push("/auth/login");
          if (err) throw err;
        } else {
          dispatch(fetchAccountDetails(user?.id));
          router.push("/dashboard");
          setLoading(false);
          // setVisible(false);
        }
      } else {
        setLoading(false);
        showNotification({
          title: "Successful",
          message: "Successful login",
          color: "green",
        });
        // setVisible(false);
      }
    } catch (loginErr) {
      if (loginErr?.message) {
        showNotification({
          color: "red",
          title: "Error !",
          message: loginErr.message || loginErr.error_description,
        });
      } else {
        showNotification({
          title: "Un-authorized",
          message: "This account has no permission to access this dashboard!",
          color: "yellow",
        });
      }

      setLoading(false);
      setVisible(false);
    }
  };
  return (
    <Paper
      radius="md"
      p="md"
      m={"md"}
      withBorder
      {...props}
      className="relative"
    >
      <Text size="lg" weight={500}>
        Welcome to FnF, login with
      </Text>
      <LoadingOverlay visible={visible} />
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => handleLogin())}>
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

          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor
              onClick={() => router.push("/auth/forgot-password")}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => router.push("/auth/register")}
            size="xs"
          >
            Don`t have an account? Register
          </Anchor>
          <Button loading={loading} type="submit">
            {upperFirst("sign In")}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
