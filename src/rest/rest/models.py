from django.db import models
# Create your models here.

# add this
class Todo(models.Model):
  description = models.TextField()

  def _str_(self):
    return self.description