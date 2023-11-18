import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React, { ReactElement, FC } from 'react';

interface AppThemeProps extends React.PropsWithChildren {
	children: ReactElement | ReactElement[];
}

export const AppTheme: FC<AppThemeProps> = props => {
	const theme = createTheme({
		components: {
			MuiButton: {
				defaultProps: {
					disableElevation: true,
					disableFocusRipple: true,
					disableRipple: true,
					disableTouchRipple: true,
					focusRipple: false,
					variant: 'contained'
				},
				styleOverrides: {
					root: {
						textTransform: 'none'
					}
				}
			},
			MuiTextField: {
				defaultProps: {
					InputProps: {
						disableUnderline: true
					},
					variant: 'filled'
				},
				styleOverrides: {
					root: {
						'& input': {
							padding: '10px 14px'
						}
					}
				}
			},
			MuiPopover: {
				defaultProps: {
					slotProps: {
						paper: {
							elevation: 0,
							className: 'shadow'
						}
					}
				}
			}
		}
	});

	return (
		<>
			<ThemeProvider theme={theme}>{props.children}</ThemeProvider>
		</>
	);
};
