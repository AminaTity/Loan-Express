from rest_framework import serializers
from .models import Loan
from django.core.exceptions import ValidationError

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'student', 'amount', 'purpose', 'status', 'category', 'duration', 'interest_rate', 'repayment_deadline', 'created_at']
        read_only_fields = ['student', 'status', 'duration', 'interest_rate', 'created_at','repayment_deadline']
    
    # Valider le montant de prêt entré par l'utilisateur
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le montant du prêt doit être supérieur à 0.")
        return value

    # Création d'un prêt et l'associé à l'utilisateur connecté
    def create(self, validated_data):
        try: 
            request = self.context['request']
            validated_data['student'] = request.user  # Associer le prêt à l'utilisateur connecté
            loan = Loan.objects.create(**validated_data)
        except ValidationError as e:
            raise serializers.ValidationError({"detail": e.messages})
        return loan
