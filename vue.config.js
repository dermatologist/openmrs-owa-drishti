module.exports = {
    // options...
    baseUrl: process.env.NODE_ENV === 'production' ? '/openmrs/owa/drishti/' : '/',

    // Other options include:
    // outputDir: undefined,
    // assetsDir: undefined,
    // runtimeCompiler: undefined,
    // productionSourceMap: undefined,
    // parallel: undefined,
    // css: undefined,

    // drishti
    googleFitShim : process.env.NODE_ENV === 'production' ? 'googlefit' : 'googlefit',
    fitbitShim: process.env.NODE_ENV === 'production' ? 'fitbit' : 'fitbit',
    omhOnFhirClientId: process.env.NODE_ENV === 'production' ? '93651a15-4664-486e-8661-eca7ebc21bda' : '93651a15-4664-486e-8661-eca7ebc21bda',
    omhOnFhirScope: process.env.NODE_ENV === 'production' ? 'patient/*.read launch' : 'patient/*.read launch',
    omhOnFhirRedirectUri: process.env.NODE_ENV === 'production' ? 'http://mohawk.canehealth.com/openmrs/owa/drishti/login' : '/login',
    omhOnFhirAPIBase: process.env.NODE_ENV === 'production' ? 'http://tomcat.nuchange.ca' : 'http://tomcat.nuchange.ca',
    omhOnFhirAPIShimmerAuth: process.env.NODE_ENV === 'production' ? '/shimmerAuthentication' : '/shimmerAuthentication',
};
