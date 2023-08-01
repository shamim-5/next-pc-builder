import { Button, Dropdown, Layout, Menu, Space } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { Header, Content, Footer } = Layout;

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setSelectedKeys([router.asPath.replace(/^.*[\\/]/, "")]);
  }, [router.asPath]);

  const items = [
    { label: <Link href="/">Home</Link>, name: "Home", key: "0", path: `/` },
    { label: <Link href="/cpuProcessor">CPU/Processor</Link>, name: "CPU/Processor", key: "1", path: `/cpuProcessor` },
    { label: <Link href="/motherboard">Motherboard</Link>, name: "Motherboard", key: "2", path: `/motherboard` },
    { label: <Link href="/ram">RAM</Link>, name: "RAM", key: "3", path: `/ram` },
    {
      label: <Link href="/powerSupply">Power Supply Unit</Link>,
      name: "Power Supply Unit",
      key: "4",
      path: `/powerSupply`,
    },
    {
      label: <Link href="/storageDevice">Storage Device</Link>,
      name: "Storage Device",
      key: "5",
      path: `/storageDevice`,
    },
    { label: <Link href="/monitor">Monitor</Link>, name: "Monitor", key: "6", path: `/monitor` },
    { label: <Link href="/others">Others</Link>, name: "Others", key: "7", path: `/others` },
  ];

  return (
    <Layout className="layout">
      <Header className="flex items-center justify-between top-0 sticky z-40">
        <div className="flex items-center justify-between lg:mr-2">
          <div>
            <Link className="flex" href={"/"}>
              <Image src="https://img.icons8.com/fluency/48/workstation.png" alt="logo" width={32} height={32} />
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-mono  ml-1">
              <Link href={"/"}>Next_PC-Builder</Link>
            </h2>
          </div>
          <div>
            <Link href={"/pcBuilder"}>
              <Button
                className="text-blue-900/100 ml-3 lg:ml-1 px-2 uppercase font-serif font-extrabold  border border-l-0 rounded-tl-none border-r-0 rounded-br-none bg-slate-50/60 transition-colors duration-500"
                type="primary"
                ghost
              >
                PC Builder
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="hidden lg:flex">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items.map((m) => {
                const key = m.path.replace(/^.*[\/]/, "");
                return {
                  key,
                  label: (
                    <Link className="text-slate-300" href={m.path}>
                      {m.name}
                    </Link>
                  ),
                };
              })}
            />
          </div>

          <div className="flex lg:hidden">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuFoldOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content>
        <div>{children}</div>
      </Content>
      <Footer className="bg-slate-300 text-center">Next Next_PC-Builder ©2023 Created by Next.js</Footer>
    </Layout>
  );
};
export default RootLayout;
