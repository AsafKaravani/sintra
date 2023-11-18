import { AppTheme } from './view/theme/AppTheme';
import { AppRouter } from './core/routing/AppRouter';

function App() {
	return (
		<>
			<AppTheme>
				<AppRouter />
			</AppTheme>
		</>
	);
}

export default App;
