export default {server: {proxy: {
  "/api": {
    target: "https://filipvrba-blog.vercel.app",
    changeOrigin: true,

    rewrite(path) {
      return path.replace(/^\/api/m, "/api")
    }
  }
}}}