// We want to have a type-safe local storage. Read more on https://degreat.co.uk/blog/typesfafe-localstorage/

// this type contains the list of things you want to store in localstorage
type Pref = {
	'@omni/config': {
		packageManager: 'npm' | 'pnpm' | 'bun' | 'yarn';
	};
};

type PrefKey = keyof Pref;

const pref = {
	get<T extends PrefKey>(key: T): Pref[T] | undefined {
		const value = localStorage.getItem(key);
		if (!value) return;

		return JSON.parse(value);
	},

	set<T extends PrefKey>(key: T, value: Pref[T]) {
		localStorage.setItem(key as string, JSON.stringify(value));
	},

	remove<T extends PrefKey>(key: T): void {
		localStorage.removeItem(key);
	}
};

export { pref };
