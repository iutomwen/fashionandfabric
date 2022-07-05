import React from "react";
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Text,
  UnstyledButton,
  Avatar,
} from "@mantine/core";
function UserButton({ name, image, email }) {
  return (
    <Group>
      {image ? <Avatar src={image} /> : <Avatar>{name[0]}</Avatar>}
      {/* <Avatar size={40} color="blue">
      BH
    </Avatar> */}
      <div>
        <Text>{name}</Text>
        <Text size="xs" color="gray">
          {email}
        </Text>
      </div>
    </Group>
  );
}

export default UserButton;
