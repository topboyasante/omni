type ToastTypes = 'default' | 'success' | 'warning' | 'error';

export interface ToastConfig {
	message?: string;
	duration?: number;
	type: ToastTypes;
}
