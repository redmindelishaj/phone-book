import { Layout } from 'antd';
import Navbar from '../navbar';
import "./index.css";

interface Props {children: React.ReactNode }
const { Header, Footer, Content } = Layout;

const MainLayout = ({ children }: Props) => (
	<Layout>
		<Header className="site-layout-header">
			<Navbar />
		</Header>
		<Content>
			<div className="site-layout-content">
				{children}
			</div>
		</Content>
		<Footer className="site-layout-footer">
			Phone Book ©2021 Created by Redmin
		</Footer>
    </Layout>
);

export default MainLayout;
