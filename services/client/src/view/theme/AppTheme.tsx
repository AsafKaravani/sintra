import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React, { ReactElement, FC } from 'react';
import { Toaster } from 'react-hot-toast';
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

			MuiSelect: {
				styleOverrides: {
					root: {
						'& .MuiSelect-select': {
							padding: '4px 14px'
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
			},

			MuiListItem: {
				defaultProps: {
					disablePadding: true
				}
			},
			MuiListItemButton: {
				defaultProps: {
					disableRipple: true
				}
			}
		}
	});

	return (
		<>
			<ThemeProvider theme={theme}>
				<Toaster
					toastOptions={{
						duration: 5000
					}}
				/>
				{props.children}
			</ThemeProvider>
		</>
	);
};
