package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null" binding:"required"`
	Email    string `json:"email" gorm:"uniqueIndex:idx_user_email;not null" binding:"required,email"`
	Password string `json:"password" gorm:"not null" binding:"required,min=6"`
}
