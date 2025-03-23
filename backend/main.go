package main

import (
	"example/web-service-gin/config"
	"example/web-service-gin/controllers"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	filesDirectory := "./streaming/"

	db, err := config.InitDB()
	if err != nil {
		log.Panic(err)
	}

	if err := config.RunMigrations(db); err != nil {
		log.Fatalf("Error al ejecutar migraciones: %v", err)
	}

	router := gin.Default()

	// config cors
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Length", "Content-Type"},
	}))

	// streaming routes
	router.Static("/streaming", filesDirectory)

	// user routes
	userController := controllers.NewUserController(db)
	router.POST("/api/users/signup", userController.CreateUser)
	router.POST("/api/users/login", userController.Login)

	router.Run(":8080")
}
