export default = {
  server: {
    proxy: {
      '/api': {
        target: 'https://filipvrba-blog.vercel.app',  # http://localhost:3000
        change_origin: true,
        rewrite: lambda {|path| path.replace(/^\/api/, '/api') },
      },
    },
  },
}
