module.exports = {
	// set your styleguidist configuration here
	title: 'Funsport Frontend Documentation',
	sections: [
		  {
			name: 'Environment Config',
		    content: 'docs/environement.md',
          	description: 'The desciption of env.config.js'
		  },
		  {
			name: 'Views',
		    components: 'src/views/*.vue'
		  },
		  {
			name: 'Components',
		    components: 'src/components/*.vue'
		  }
		],
	// components: 'src/components/**/[A-Z]*.vue',
	// defaultExample: true,
	// sections: [
	//   {
	//     name: 'First Section',
	//     components: 'src/components/**/[A-Z]*.vue'
	//   }
	// ],
	// webpackConfig: {
	//   // custom config goes here
	// },
}
