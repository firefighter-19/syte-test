import React from "react";
import { Checkbox, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Vertical } from "../../../shared/api/category/catalog.response";
import { NavLink, useSearchParams } from "react-router";

export const CatalogTableList: React.FC<{
  data: Vertical[];
  handleDelete: (id: string) => void;
  deleteCatalog: ({
    user_id,
    catalog_id,
  }: {
    user_id: string;
    catalog_id: string;
  }) => void;
}> = ({
  data,
  deleteCatalog,
  handleDelete,
}: {
  data: Vertical[];
  handleDelete: (id: string) => void;
  deleteCatalog: ({
    user_id,
    catalog_id,
  }: {
    user_id: string;
    catalog_id: string;
  }) => void;
}) => {
  const columns: TableProps<Vertical & { key: string }>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vertical",
      dataIndex: "vertical",
      key: "vertical",
    },
    {
      title: "Primary",
      dataIndex: "is_primary",
      key: "primary",
      render: (_, { is_primary }) => <a>{is_primary ? "Yes" : "No"}</a>,
    },
    {
      title: "Languages",
      key: "locales",
      dataIndex: "locales",
      render: (_, { locales }) => (
        <>
          {locales.map((tag) => {
            const color = tag.language === "English" ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag.id}>
                {tag.language.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Indexed At",
      dataIndex: "indexed_at",
      key: "indexed_at",
      render: (_, { indexed_at }) => (
        <p>{new Date(indexed_at).toLocaleDateString("en-CA")}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink
            to={`/create?user_id=${searchParams.get("user_id")}`}
            state={record}
          >
            Change {record.name}
          </NavLink>
          <a
            onClick={() =>
              deleteCatalog({
                catalog_id: record.id,
                user_id: searchParams.get("user_id") || "",
              })
            }
          >
            Delete
          </a>
          <Checkbox onChange={() => handleDelete(record.id)}>
            Choose to delete
          </Checkbox>
        </Space>
      ),
    },
  ];

  const [searchParams] = useSearchParams();

  const mappedData: Array<Vertical & { key: string }> = data?.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });

  return (
    <>
      {data?.length ? (
        <Table<Vertical & { key: string }>
          columns={columns}
          dataSource={mappedData}
        />
      ) : (
        <NavLink to={`/create?user_id=${searchParams.get("user_id")}`}>
          Create table
        </NavLink>
      )}
    </>
  );
};
