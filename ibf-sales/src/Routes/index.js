import DashboardComponent from '../Components/Containers/DashboardContainer/DashboardContainer';
import ProductOverviewContainer from '../Components/Containers/ProductOverviewContainer/ProductOverviewContainer';
import AccountDashboardContainer from '../Components/Containers/AccountDashboardContainer/AccountDashboardContainer';
import CheckoutContainer from '../Components/Containers/CheckoutContainer/CheckoutContainer';
import LoginContainer from '../Components/Containers/LoginContainer/LoginContainer';
import RegisterContainer from '../Components/Containers/RegisterContainer/RegisterContainer';

const Routes = [
	{
		path: '/',
		component: DashboardComponent,
		id: 1,
		exact: true
	},
	{
		path: '/search',
		component: ProductOverviewContainer,
		id: 2
	},
	{
		path: '/accounting',
		component: AccountDashboardContainer,
		id: 3
	},
	{
		path: '/checkout',
		component: CheckoutContainer,
		id: 4
	},
	{
		path: '/login',
		component: LoginContainer,
		id: 5
	},
	{
		path: '/signup',
		component: RegisterContainer,
		id: 6
	}
];
export default Routes;
