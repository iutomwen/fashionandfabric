import React from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  ActionIcon,
  Menu,
} from "@mantine/core";
import {
  Pencil,
  Messages,
  Note,
  ReportAnalytics,
  Trash,
} from "tabler-icons-react";
import { fullName } from "@/utils/helper";
import moment from "moment";
const rolesData = ["personal", "business"];
export function UsersList({ data }) {
  //   console.log(data);
  const rows = data?.map((item) => (
    <tr key={item?.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item?.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {fullName(item?.first_name, item?.last_name)}
            </Text>
            <Text size="xs" color="dimmed">
              {item?.username}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Select
          data={rolesData}
          defaultValue={item?.roles}
          variant="unstyled"
          style={{ textTransform: "capitalize" }}
          className=" capitalize text-red-400"
        />
      </td>
      <td>{moment(item?.created_at).fromNow()}</td>
      <td>
        {item?.verified ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Disabled
          </Badge>
        )}
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <Menu transition="pop" withArrow placement="end">
            <Menu.Item icon={<Messages size={16} />}>Send message</Menu.Item>
            <Menu.Item icon={<Note size={16} />}>Add note</Menu.Item>
            <Menu.Item icon={<ReportAnalytics size={16} />}>
              Analytics
            </Menu.Item>
            <Menu.Item icon={<Trash size={16} />} color="red">
              Remove account
            </Menu.Item>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>User Info</th>
            <th>Role</th>
            <th>Created</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
