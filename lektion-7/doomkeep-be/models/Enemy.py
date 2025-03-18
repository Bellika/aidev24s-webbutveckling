from config.db import db

class Enemy(db.Model):
  __tablename__ = 'enemies'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  enemy_type = db.Column(db.String(20), nullable=False)
  strength = db.Column(db.Integer, default=5)
  agility = db.Column(db.Integer, default=5)
  intelligence = db.Column(db.Integer, default=5)
  defence = db.Column(db.Integer, default=5)
  health = db.Column(db.Integer, default=100)
  image_url = db.Column(db.Text, default="")

  def __repr__(self):
    return f"<Enemy {self.name} ({self.enemy_type})>"