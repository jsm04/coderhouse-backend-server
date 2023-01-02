let config;

if (process.env.NODE_ENV === 'production') {
	config = {
		port: process.env.port,
		domain: process.env.domain,
		mongoUri: process.env.mongoUri,
		expressSessionSecret: process.env.expressSessionSecret,
		jwtAccessSecret: process.env.jwtAccessSecret,
		jwtRefreshSecret: process.env.jwtRefreshSecret
	};
} else {
	config = {
		port: 8080,
		domain: '',
		mongoUri: 'mongodb://127.0.0.1:27017/BackendRest',
		expressSessionSecret: 'adk145_0as9f5k:alllj5-141skjfh4429s0l:skf2',
		jwtAccessSecret: '0129-kd0128ma_llakf2f1jLKA-s10fmsk10_sk24x',
		jwtRefreshSecret: '195_dalk10539-4039amfs19-2411f14lc1js=12al'
	};
}

export default config;
