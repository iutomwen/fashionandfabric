import React from "react";
import { Group, Text, Avatar } from "@mantine/core";
function UserButton({ name, image, email }) {
  return (
    <Group>
      {image ? <Avatar src={image} /> : <Avatar>{name[0]}</Avatar>}
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
