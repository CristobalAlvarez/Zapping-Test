package config

import (
	"fmt"

	"example/web-service-gin/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func GetDBConfig() *DBConfig {

	return &DBConfig{
		Host:     "localhost",
		Port:     "5432",
		User:     "streaming_user",
		Password: "password",
		DBName:   "streaming_db",
		SSLMode:  "disable",
	}
}

func InitDB() (*gorm.DB, error) {
	config := GetDBConfig()

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		config.Host, config.Port, config.User, config.Password, config.DBName, config.SSLMode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func RunMigrations(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
	)
}
