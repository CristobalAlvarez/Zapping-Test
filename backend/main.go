package main

import (
	"example/zapping-test/config"
	"example/zapping-test/controllers"
	"example/zapping-test/timer"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func noCacheMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
		c.Header("Pragma", "no-cache")
		c.Header("Expires", "0")
		c.Next()
	}
}

func main() {

	filesDirectory := "./streaming/"

	db, err := config.InitDB()
	if err != nil {
		log.Panic(err)
	}

	if err := config.RunMigrations(db); err != nil {
		log.Fatalf("Error running migrations: %v", err)
	}

	router := gin.Default()

	// config cors
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// user routes
	userController := controllers.NewUserController(db)
	router.POST("/api/users/signup", userController.CreateUser)
	router.POST("/api/users/login", userController.Login)

	// protected users route
	protectedGroup := router.Group("/api/users")
	protectedGroup.Use(config.AuthMiddleware())
	{
		protectedGroup.GET("/me", userController.GetCurrentUser)
	}

	// streaming routes
	streamingGroup := router.Group("/streaming")
	streamingGroup.Use(config.AuthMiddleware())
	streamingGroup.Use(noCacheMiddleware())
	{
		streamingGroup.Static("/", filesDirectory)
	}

	// start streaming timer
	timer.StartStreamingTimer()

	router.Run(":8080")
}
